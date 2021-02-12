<template>
    <div>
        <div class="row">
            <MemberFilterForm
                class="col-lg-6 col-md-5 mb-5"
                :minContribution="memberFilters.minContribution"
                :targetContribution="memberFilters.targetContribution"
                :updateMemberFilters="updateMemberFilters"
            />

            <VueGoodTable
                :columns="columns"
                :rows="memberList"
            />
        </div>
    </div>
</template>

<script>
import "vue-good-table/dist/vue-good-table.css";

import { VueGoodTable } from "vue-good-table";
import MemberFilterForm from "./MemberFilterForm";

const defaultColumns = [
    {
        label: "Rank",
        field: "clanRank",
        type: "number"
    },
    {
        label: "Player",
        field: "name",
        tdClass: "fw-bold"
    },
    {
        label: "Role",
        field: "role",
        tdClass: "text-capitalize"
    },
];

export default {
    components: {
        MemberFilterForm,
        VueGoodTable
    },

    props: {
        memberList: { type: Array, required: true },
        tag: { type: String, required: true },
        riverRaceLog: { type: Array, required: true },
    },

    data() {
        return {
            columns: defaultColumns,
            currentSeasonMap: {},
            flattenedStandings: [],
            memberFilters: {
                minContribution: "",
                targetContribution: ""
            },
        };
    },

    methods: {
        updateMemberFilters({ target }) {
            this.memberFilters[target.name] = target.value;
        },

        seasonFieldFilterClass({ tag }, seasonStamp) {
            const currentPlayerScore = this.getCurrentPlayerMapValue(tag, seasonStamp);

            const {
                minContribution = "", targetContribution = ""
            } = this.memberFilters;

            if (!minContribution || !targetContribution || currentPlayerScore === "") return "";

            if (currentPlayerScore <= minContribution) {
                return "bg-light-red";
            } else if (
                currentPlayerScore > minContribution &&
                currentPlayerScore < targetContribution
            ) {
                return "bg-light-yellow";
            } else if (currentPlayerScore >= targetContribution) {
                return "bg-light-green";
            }

            return "";
        },

        formatFlattenedStandings() {
            if (this.flattenedStandings.length) return;

            this.flattenedStandings = this.riverRaceLog.map(log => {
                const { standings } = log;
                const currentClan = standings.find(({ clan }) => clan.tag === this.tag);

                return {
                    ...log,
                    standings: [ currentClan ]
                };
            });
        },

        formatColumns() {
            const customColumns = this.flattenedStandings.map(({
                seasonId, sectionIndex, standings
            }) => {
                const [ currentClanStanding ] = standings;
                const { participants } = currentClanStanding.clan;
                const seasonStamp = `${seasonId}-${sectionIndex + 1}`;

                return {
                    label: seasonStamp,
                    field: row => this.seasonFieldHandler(row, participants, seasonStamp),
                    thClass: "text-center",
                    tdClass: row => this.seasonFieldFilterClass(row, seasonStamp),
                    type: "number"
                };
            });

            this.columns = [ ...defaultColumns, ...customColumns ];
        },

        seasonFieldHandler({ tag }, currentStandingParticipants, seasonStamp) {
            const currentPlayerMapValue = this.getCurrentPlayerMapValue(tag, seasonStamp);

            if (currentPlayerMapValue) {
                return currentPlayerMapValue;
            }

            const currentPlayer = currentStandingParticipants.find(participant => {
                return participant.tag === tag;
            });
            const { fame = "", repairPoints = "" } = currentPlayer || {};

            this.setCurrentSeasonMap(currentPlayer, seasonStamp);

            return fame + repairPoints;
        },

        setCurrentSeasonMap(currentPlayer, seasonStamp) {
            const { fame = "", repairPoints = "", tag = "" } = currentPlayer || 0;

            if (!this.currentSeasonMap[seasonStamp]) {
                this.currentSeasonMap[seasonStamp] = {};
            }

            if (tag && !this.currentSeasonMap[seasonStamp][tag]) {
                this.currentSeasonMap[seasonStamp][tag] = fame + repairPoints;
            }
        },

        getCurrentPlayerMapValue(playerTag, seasonStamp) {
            const currentMapValue = this.currentSeasonMap[seasonStamp] &&
                this.currentSeasonMap[seasonStamp][playerTag];

            if (currentMapValue === undefined) return "";

            return currentMapValue ? currentMapValue : 0;
        },

        refreshTable() {
            this.formatFlattenedStandings();
            this.formatColumns();
        }
    },

    mounted() {
        this.refreshTable();
    },

    watch: {
        tag(currentTag, previousTag) {
            if (currentTag !== previousTag) {
                this.flattenedStandings = [];
                this.currentSeasonMap = {};
            }
        },

        riverRaceLog() {
            this.refreshTable();
        },

        "memberFilters.minContribution"() {
            this.refreshTable();
        },

        "memberFilters.targetContribution"() {
            this.refreshTable();
        }
    }
};
</script>

<style lang="scss">
.bg-light-red {
    background: rgba(255, 0, 0, .5);
}

.bg-light-green {
    background: rgba(0, 175, 0, .5);
}

.bg-light-yellow {
    background: rgba(240, 255, 0, .5)
}
</style>