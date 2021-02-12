<template>
    <div>
        <label
            for="clan-tag-search"
            class="form-label"
        >
            Search for Clan
            <small>(exclude hashtag)</small>
        </label>

        <div class="input-group mb-3">
            <input
                type="text"
                class="form-control"
                id="clan-tag-search"
                placeholder="Clan Tag"
                @input="setClanTag"
                :value="clanTag"
            >

            <button
                class="btn btn-outline-secondary d-flex align-items-center"
                type="button"
                @click="handleFetch"
            >
                <template v-if="isLoading">
                    <span class="me-1">Loading...</span>
                    <span class="spinner-border spinner-border-sm"></span>
                </template>
                <span v-else>Search</span>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        clanTag: { type: String, required: true },
        fetchClanRiverRaceData: { type: Function, required: true },
        isLoading: { type: Boolean, required: true },
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