<template>
    <p class="homeText">
        WELCOME TO CURRENCY APPLICATION
    </p>
</template>
<script>
    import CurrencyService from '../api-services/currency.service';

    export default {
        name: "CurrencyDashboard",
        created() {
            CurrencyService.getAll().then((response) => {
                console.log(response.data);
            }).catch((error) => {
                console.log(error.response.data);
            });
        }
    }
</script>

<style scoped>
    .homeText{
        font-size: 35px;
        color: red;
        text-align: center;
        position: relative;
        top:30px;
        text-shadow: 2px 2px 2px gray;
    }
</style>