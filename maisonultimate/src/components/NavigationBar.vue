
<template>
    <aside id="Navigation-Bar">

        <router-link class="Navigation-Bar-item" to="/">
            <img src="@/components/icons/home.svg" width="32" height="32">
        </router-link>

        <router-link class="Navigation-Bar-item" to="/team">
            <img src="@/components/icons/pokemon.svg" width="32" height="32">
        </router-link>
        <!-- <router-link class="Navigation-Bar-item" to="/moves">
            <img src="/icons/habilidades.svg" width="32" height="32">
        </router-link>
        <router-link class="Navigation-Bar-item" to="/types">
            <img src="/icons/tipos.svg" width="32" height="32">
        </router-link>
        <router-link class="Navigation-Bar-item end" to="/logout">
            <img src="/icons/logout.svg" width="32" height="32">
        </router-link> -->
    </aside>
    <router-view></router-view>
</template>


<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style>
#Navigation-Bar {
    /* FLEX CONFIG */
    display: flex;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
    position: sticky;
    top: 0;
    z-index: 0;

    /* STYLE CONFIG */
    background-color: var(--Navigation-Bar-bg-color);
    float: left;
    width: 80px;
    height: 100vh;
}

#Navigation-Bar .Navigation-Bar-item {
    /* FLEX CONFIG */
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;

    /* SYTLE CONFIG */
    color: white;
    text-decoration: none;
    width: 80%;
    height: var(--Navigation-Bar-item-height);
    border-radius: var(--Navigation-Bar-item-border-radius);
}

.router-link-exact-active{
    background-color: var(--Navigation-Bar-item-bg-color);
}

#Navigation-Bar .Navigation-Bar-item:first-child {
    margin-top: 10px;
}

#Navigation-Bar .Navigation-Bar-item:hover {
    background-color: var(--Navigation-Bar-item-bg-color);
}

#Navigation-Bar .end {
    margin-top: auto;
    margin-bottom: 10px;
}
</style>