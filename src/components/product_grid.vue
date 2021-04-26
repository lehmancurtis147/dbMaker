
<template>
  <table>
    <tr>
      <th>Device</th>
      <th>Recoverys</th>
      <th>Boot</th>
      <th>System</th>
      <th>Vendor</th>
    </tr>
    <tr>
      <td>
        <input type="text" v-model="newProduct.device" />
      </td>
      <td>
        <input type="text" v-model="newProduct.recoverys" />
      </td>
      <td>
        <input type="text" v-model="newProduct.boot" />
      </td>
      <td>
        <input type="text" v-model="newProduct.system" />
      </td>
      <td>
        <input type="text" v-model="newProduct.vendor" />
      </td>
      <td>
        <button @click="add">Add</button>
      </td>
      <td>
        <button @click="clear">Clear</button>
      </td>
    </tr>
    <tr v-for="product in products" :key="product.id">
      <template v-if="editProduct.id==product.id">
        <td>
          <input type="text" v-model="editProduct.device" />
        </td>
        <td>
          <input type="text" v-model="editProduct.recoverys" />
        </td>
        <td>
          <input type="text" v-model="editProduct.boot" />
        </td>
        <td>
          <input type="text" v-model="editProduct.system" />
        </td>
        <td>
          <input type="text" v-model="editProduct.vendor" />
        </td>
        <td>
          <button @click="update(editProduct.id)">Update</button>
        </td>
        <td>
          <button @click="cancelUpdate">Cancel</button>
        </td>
      </template>
      <template v-else>
        <td>{{product.device}}</td>
        <td>{{product.recoverys}}</td>
        <td>{{product.boot}}</td>
        <td>{{product.system}}</td>
        <td>((product,vendor))</id>
        <td>
          <button @click="edit(product.id)">Edit</button>
        </td>
        <td>
          <button @click="remove(product.id)">Delete</button>
        </td>
      </template>
    </tr>
  </table>
</template>
<script>
import { ProductService } from '../service/product_service'
export default {
  name: 'Product',
  props: {
    products: {
      required: true,
      type: Array
    }
  },
  data: function () {
    return {
      newProduct: null,
      editProduct: {},
      service: new ProductService()
    }
  },
  beforeMount: function () {
    this.clear()
  },
  methods: {
    async add () {
      try {
        const productsAdded = await this.service.addProduct(this.newProduct)
        this.$emit('add-item', productsAdded[0])
        this.clear()
      } catch (ex) {
        alert(ex.message)
      }
    },
    clear () {
      this.newProduct = {
        device: '',
        recoverys: '',
        boot: '',
        system: '',
        vendor: ''
      }
    },
    edit (id) {
      var product = this.products.find(qry => qry.id === id)
      this.editProduct = {
        id: product.id,
        device: product.device,
        recoverys: product.recoverys,
        boot: product.boot,
        system: product.system,
        vendor: product.vendor
      }
    },
    async remove (id) {
      const service = new ProductService()
      const noOfProductRemoved = await this.service.removeProduct(id)
      if (noOfProductRemoved > 0) {
        this.$emit('remove-item')
      }
    },
    async update (id) {
      debugger
      const noOfProductsUpdated = await this.service.updateProductById(
        this.editProduct
      )
      if (noOfProductsUpdated > 0) {
        this.cancelUpdate()
        this.$emit('update-item')
      }
    },
    cancelUpdate () {
      this.editproduct = {}
    }
  }
}
</script>
