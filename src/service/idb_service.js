import { connection } from './jsstore_con'
import { DATA_TYPE } from 'jsstore'

const getDatabase = () => {
  const tblProduct = {
    name: 'Products',
    columns: {
      id: {
        primaryKey: true,
        autoIncrement: true
      },
      device: {
        notNull: true,
        dataType: DATA_TYPE.String
      },
      recoverys: {
        dataType: DATA_TYPE.String,
        default: 'twrp'
      },
      boot: {
        notNull: true,
        dataType: DATA_TYPE.String
      },
      system: {
        dataType: DATA_TYPE.String,
        notNull: true
      },
      vendor: {
        dataType: DATA_TYPE.String,
        notNull: true
      }
    }
  }
  const dataBase = {
    name: 'Vue_Ateam',
    tables: [tblProduct]
  }
  return dataBase
}

export const initJsStore = async () => {
  const dataBase = getDatabase()
  return await connection.initDb(dataBase)
}
