import { BaseTask } from 'adonis5-scheduler/build'
import Monthly from 'App/Models/Monthly';
import User from 'App/Models/User';
import axios from 'axios'

export default class LatePayment extends BaseTask {
  public static get schedule() {
    return '* * * * * *'
    //0 0 12 ? * TUE * toda terça de 12:00
  }

  public static get useLock() {
    return false
  }

  public async handle() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const monthExpiration = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear())

    const today = `${day}/${monthExpiration}/${year}`

    const dados = await Monthly.query()
      .where('expiration_date', '=', today)
      .where('payment_status', '=', 'Atrasado')
      .select('user_id')

    const idsArrays = dados.map((dado) => dado.user_id)

    idsArrays.map(async (oneSignal_Id) => {
      const oneSignalId = await User.query().where('id', '=', oneSignal_Id).select('one_signal_id')
      const idsArrays = oneSignalId.map((dado) => dado.one_signal_id)

      idsArrays.map(async (id) => {
        try {
          const body = {
            "deviceId": id,
            "message": "O seu pagamento está atrasado!",
            "title": "Mensalidade - Lab Saúde"
          }

          const res = await axios.post('https://api.lab-saude.com/admin/notifications/send-notification', body)
          console.log(res.data)

        } catch (error) {
          console.log(error.response.data)
        }

      })

    })
  }
}
