<template>
    <div id="app">
        <Navbar />

        <div class="w-25 m-5">
            <ClanTagInput
                :clanTag="clanTag"
                :fetchClanRiverRaceData="fetchClanRiverRaceData"
                :setClanTag="setClanTag"
            />
        </div>
    </div>
</template>

<script>
import ClanTagInput from "@/components/ClanTagInput";
import Navbar from "@/components/Navbar";

import { getClanRiverRaceData } from "@/services/ClashRoyaleAPI";

export default {
    name: "App",
    components: {
        ClanTagInput,
        Navbar
    },
    data() {
        return {
            clanScore: "",
            clanWarTrophies: "",
            clanTag: "Y2CG2UYL",
            memberList: [],
            name: "",
            riverRaceLog: [],
            tag: ""
        };
    },
    methods: {
        async fetchClanRiverRaceData() {
            const {
                memberList, riverRaceLog, ...clanData
            } = await getClanRiverRaceData(this.clanTag);

            this.clanScore = clanData.clanScore;
            this.clanWarTrophies = clanData.clanWarTrophies;
            this.memberList = memberList;
            this.name = clanData.name;
            this.riverRaceLog = riverRaceLog;
            this.tag = clanData.tag;
        },

        setClanTag({ target }) {
            this.clanTag = target.value;
        }
    },
    mounted() {
        // TODO: temporary, will persist somehow
        if (!this.memberList.length) {
            this.fetchClanRiverRaceData();
        }
    }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
