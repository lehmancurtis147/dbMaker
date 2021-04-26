import { connection } from './jsstore_con'

export class ProductService {
  constructor () {
    this.tableDevice = 'Products'
  }

  getProducts () {
    return connection.select({
      from: this.tableDevice
    })
  }

  addProduct (product) {
    return connection.insert({
      into: this.tableDevice,
      values: [product],
      return: true
    })
  }

  getProductById (id) {
    return connection.select({
      from: this.tableDevice,
      where: {
        id: id
      }
    })
  }

  removeProduct (id) {
    return connection.remove({
      from: this.tableDevice,
      where: {
        id: id
      }
    })
  }

  updateProductById (product) {
    return connection.update({
      in: this.tableDevice,
      set: {
        device: product.device,
        recoverys: product.recoverys,
        boot: product.boot,
        system: product.system,
        vendor: product.vendor
      },
      where: {
        id: product.id
      }
    })
  }
}
