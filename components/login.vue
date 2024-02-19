<script lang="ts" setup>
const { t } = useI18n({
    useScope: 'local'
});
const { gamerTag } = useAuth();

const gamerTagError = ref<string>('');

const enterGamerTag = () => {
    console.log('>>GamerTag:%o', gamerTag.value);
    if (gamerTag.value && gamerTag.value.length > 3) {
        gamerTagError.value = '';
        console.log('>>GamerTag:%o', gamerTag.value);
        navigateTo('/game');
    } else {
        gamerTag.value = null;
        gamerTagError.value = t('gamer tag error');
    }
};
</script>

<template>
<div>
    <p>{{ t(`game login greeting`) }}</p>
    <p>{{ t(`game tag disclaimer`) }}</p>
    <form @submit.prevent="() => enterGamerTag()">
        <label for="game-tag">{{ t('game tag label') }}</label>
        <input id="game-tag" v-model="gamerTag" required autocomplete="false" />
        <button type="submit">Set</button>
        <p v-if="gamerTagError">{{ gamerTagError }}</p>
    </form>
</div>
</template>

<style scoped></style>

<i18n lang="json">
{
    "en": {
        "game login greeting": "Hello! To play this game you must enter a gamer tag, with which your score will be associated.",
        "game tag disclaimer": "The tag you enter will only not be checked (even for uniqueness) only for length greater than 4 letters, so be careful which tag you choose.",
        "game tag label": "Choose your tag",
        "gamer tag error": "Your gamer tag is too short. Please enter a name with more than 3 characters!"
    },
    "de": {
        "game login greeting": "Hallo! Um mitspielen zu können, musst Du Dir einen Spielernamen geben, mit dem Deine Punkte verbunden werden.",
        "game tag disclaimer": "Dein Spielername wird nicht überprüft (noch nicht einmal auf Eindeutigkeit) also sei bitte achtsam, was Du eingbibst. Allerdings musst Du mehr als vier Zeichen eingeben.",
        "game tag label": "Wähle einen Namen",
        "gamer tag error": "Dein gewählter Name ist zu kurz. Bitte gib mehr als vier Zeichen ein!"
    }
}
</i18n>