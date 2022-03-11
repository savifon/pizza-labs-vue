<template>
  <div class="header">
    <div class="box">
      <router-link to="/">
        <img :src="logo" alt="Pizza Labs" class="logo" />
      </router-link>

      <ul class="nav">
        <li v-for="option in menuOptions" :key="option.ref">
          <router-link :to="option.ref">
            {{ option.title }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import logo from '@/assets/images/logo.svg'

export default {
  name: 'HeaderApp',
  setup () {
    const menuOptions = [
      { title: 'Início', ref: '/' },
      { title: 'Pedidos Realizados', ref: '/pedidos' }
    ]

    return {
      logo,
      menuOptions
    }
  }
}
</script>

<style scoped lang="scss">
div.header {
  box-shadow: 0px 5px 15px 1px var(--colorBgPrimary);
  position: sticky;
  top: 1px;
  background: white;
}

div.box {
  max-width: 1250px;
  margin: 0 auto;
  padding: 10px 30px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 15px;

  @media screen and (max-width: 767px) {
    justify-content: center;
  }

  & .logo {
    max-height: 70px;
    max-width: 100%;
  }

  & .nav {
    display: flex;
    gap: 10px;

    & li {
      transition: all ease 0.2s;
      list-style: none;
      display: flex;
      border-radius: var(--radius);

      & a {
        padding: 10px;
        color: var(--colorText);
      }

      &:hover {
        background: var(--colorBgPrimary);
      }
    }
  }
}
</style>
