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

        <div class="m-5">
            <ClanHeaderCard
                class="w-50"
                :clanScore="clanScore"
                :clanWarTrophies="clanWarTrophies"
                :currentMemberCount="currentMemberCount"
                :name="name"
                :tag="tag"
            />

            <RiverRaceTable
                class="mt-5"
                :memberList="memberList"
                :riverRaceLog="riverRaceLog"
                :tag="tag"
            />
        </div>
    </div>
</template>

<script>
import ClanHeaderCard from "@/components/ClanHeaderCard";
import ClanTagInput from "@/components/ClanTagInput";
import Navbar from "@/components/Navbar";
import RiverRaceTable from "@/components/RiverRaceTable";

import { getClanRiverRaceData } from "@/services/ClashRoyaleAPI";

export default {
    name: "App",

    components: {
        ClanHeaderCard,
        ClanTagInput,
        Navbar,
        RiverRaceTable
    },

    data() {
        return {
            clanScore: 0,
            clanWarTrophies: 0,
            clanTag: "Y2CG2UYL",
            memberList: [],
            name: "",
            riverRaceLog: [],
            tag: ""
        };
    },

    computed: {
        currentMemberCount() {
            return this.memberList.length;
        }
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
}
</style>
