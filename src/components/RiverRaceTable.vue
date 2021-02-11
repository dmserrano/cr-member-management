<template>
    <div>
        <VueGoodTable
            :columns="columns"
            :rows="memberList"
        />
    </div>
</template>

<script>
import "vue-good-table/dist/vue-good-table.css";

import { VueGoodTable } from "vue-good-table";

export default {
    components: {
        VueGoodTable
    },

    props: {
        memberList: { type: Array, required: true },
        tag: { type: String, required: true },
        riverRaceLog: { type: Array, required: true },
    },

    data() {
        return {
            flattenedStandings: [],
            columns: [
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
            ]
        };
    },

    methods: {
        formatFlattenedStandings() {
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

                return {
                    label: `${seasonId}-${sectionIndex + 1}`,
                    field: row => this.seasonFieldHandler(row, participants),
                    thClass: "text-center",
                    type: "number"
                };
            });

            this.columns = [ ...this.columns, ...customColumns ];
        },

        seasonFieldHandler({ tag }, currentStandingParticipants) {
            const currentPlayer = currentStandingParticipants.find(participant => {
                return participant.tag === tag;
            });
            const { fame = "", repairPoints = "" } = currentPlayer || {};

            return fame + repairPoints;
        }
    },

    watch: {
        riverRaceLog() {
            this.formatFlattenedStandings();
            this.formatColumns();
        }
    }
};
</script>