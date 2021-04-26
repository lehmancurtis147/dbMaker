<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <ProductGrid
      :products="products"
      @add-item="addProduct"
      @remove-item="refreshProduct"
      @update-item="refreshProduct"
    />
  </div>
</template>

<script>
import productGrid from './components/product_grid.vue'
import { initJsStore } from './service/idb_service'
import { ProductService } from './service/product_service'
import { Global } from './global'
export default {
  name: 'app',
  components: {
    ProductGrid
  },
  async beforeCreate () {
    try {
      const isDbCreated = await initJsStore()
      if (isDbCreated) {
        console.log('db created')
        // prefill database
      } else {
        console.log('db opened')
      }
    } catch (ex) {
      console.error(ex)
      alert(ex.message)
      Global.isIndexedDbSupported = false
    }
  },
  mounted () {
    this.refreshProduct()
  },
  data () {
    return {
      products: []
    }
  },
  methods: {
    async refreshProduct () {
      this.product = await new ProductService().getProducts()
    },
    addProduct (product) {
      this.product.push(product)
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
