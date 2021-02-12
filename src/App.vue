<template>
    <div id="app">
        <Navbar />

        <div class="row mx-5">
            <div class="col-md-8 mt-5">
                <h2>Clan Wars Member Management</h2>

                <div class="">
                    <p>View weekly contributions for Clan Wars to more accurately determine which members have been more or less involved.</p>

                    <p>Start by entering your clan tag to view members weekly contributions. After that, you can add filters to view which members have met a specific contribution goal or not.</p>
                </div>
            </div>

            <div class="col-md-4 mt-5">
                <ClanTagInput
                    :clanTag="clanTag"
                    :fetchClanRiverRaceData="fetchClanRiverRaceData"
                    :isLoading="isLoading"
                    :setClanTag="setClanTag"
                />
            </div>
        </div>

        <div class="row m-5" v-if="name">
            <ClanHeaderCard
                class="col-lg-6 col-md-12"
                :clanScore="clanScore"
                :clanWarTrophies="clanWarTrophies"
                :currentMemberCount="currentMemberCount"
                :name="name"
                :tag="tag"
            />

            <RiverRaceTable
                class="col-md-12 mt-5"
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
            clanTag: "",
            isLoading: false,
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
            this.isLoading = true;

            const {
                memberList, riverRaceLog, ...clanData
            } = await getClanRiverRaceData(this.clanTag);

            this.isLoading = false;
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
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
