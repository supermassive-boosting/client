<script setup lang="ts">
  import { RouterLink } from 'vue-router';
</script>

<template>
  <div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky">
    <nav class="uk-navbar-container">
      <div class="uk-container">
        <div uk-navbar>
          <div class="uk-navbar-left">
            <ul class="uk-navbar-nav">
              <li>
                <RouterLink to="/" exact>Home</RouterLink>
              </li>
              <li>
                <RouterLink to="/hww">How We Work?</RouterLink>
              </li>
            </ul>
          </div>
          <div class="uk-navbar-center">
            <a class="uk-navbar-item uk-logo"><span class="supermassive-text">Supermassive</span></a>
          </div>
          <div class="uk-navbar-right">
            <ul class="uk-navbar-nav">
              <li>
                <RouterLink to="/login">Login</RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
