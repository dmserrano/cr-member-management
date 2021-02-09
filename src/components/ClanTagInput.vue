<template>
    <div class="input-group mb-3">
        <input
            type="text"
            class="form-control"
            placeholder="Clan Tag"
            @input="setClanTag"
            :value="clanTag"
        >

        <button
            class="btn btn-outline-secondary"
            type="button"
            @click="handleFetch"
        >
            Search
        </button>
    </div>
</template>

<script>
export default {
    props: {
        clanTag: { type: String, required: true },
        fetchClanRiverRaceData: { type: Function, required: true },
        setClanTag: { type: Function, required: true },
    },

    methods: {
        handleFetch() {
            if (!this.clanTag) {
                return alert("Please input a clan tag");
            }

            if (this.clanTag.includes("#")) {
                return alert("Please do not include a hash (#) in the clan tag.");
            }

            this.fetchClanRiverRaceData();
        }
    }
};
</script>