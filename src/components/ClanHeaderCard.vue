<template>
    <div class="card">
        <div class="card-body">
            <h4 class="card-title">{{ name }}</h4>

            <div class="d-flex">
                <div class="text-muted me-3">{{ tag }}</div>
                <div class="text-muted me-3">Clan Score: {{ clanScore }}</div>
                <div class="text-muted me-3">Clan War Trophies: {{ clanWarTrophies }}</div>
                <div class="text-muted">Member Count: {{ currentMemberCount }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        clanScore: { type: Number, required: true },
        clanWarTrophies: { type: Number, required: true },
        currentMemberCount: { type: Number, required: true },
        name: { type: String, required: true },
        tag: { type: String, required: true },
    }
};
</script>