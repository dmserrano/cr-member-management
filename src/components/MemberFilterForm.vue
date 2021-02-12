<template>
    <div class="card">
        <div class="card-body">
            <h4 class="card-title">Member Filter Settings</h4>
            <p>These settings can be used to visually display if members have met certain criteria.</p>

            <div class="d-flex">
                <div class="me-5">
                    <label
                        for="min-contribution"
                        class="form-label"
                    >
                        Min Contribution
                        <small>(per week)</small>
                    </label>

                    <input
                        type="number"
                        class="form-control"
                        id="min-contribution"
                        name="minContribution"
                        placeholder="0"
                        :value="minContribution"
                        @blur="updateMemberFilters"
                    >
                </div>

                <div>
                    <label
                        for="target-contribution"
                        class="form-label"
                    >
                        Target Contribution
                        <small>(per week)</small>
                    </label>

                    <input
                        type="number"
                        class="form-control"
                        id="target-contribution"
                        placeholder="2000"
                        name="targetContribution"
                        :value="targetContribution"
                        @blur="updateMemberFilters"
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        minContribution: { Type: [ Number, String ], required: true },
        targetContribution: { Type: [ Number, String ], required: true },
        updateMemberFilters: { Type: Function, required: true }
    }
};
</script>