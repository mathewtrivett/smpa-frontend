<template>
  <div>
    <h1 class="govuk-heading-xl">Submitted Applications</h1>

    <p>These are all the planning applications made by this account.</p>

    <p v-if="this.loading">Requesting data.</p>

    <div v-if="this.loading === false && this.error" class="govuk-inset-text govuk-inset-text--error ">
      There has been an error. Try again later.
    </div>


    <div v-if="this.applications.length === 0 && this.loading === false && this.error === false">
      <p>Currently there are no applications associated with this account.</p>
    </div>

    <div v-if="this.applications.length > 0 && this.loading === false && this.error === false">
      <div class="govuk-form-group">
        <label class="govuk-label" for="sort">
          Sort by
        </label>
        <select class="govuk-select" id="sort" name="sort">
          <option value="draft">Draft</option>
          <option value="submitted">Submitted</option>
          <option value="registered">Registered</option>
          <option value="invalid">Invalid</option>
          <option value="consultation">Consultation</option>
          <option value="rejected">Rejected</option>
          <option value="approved">Approved</option>
        </select>
      </div>

      <table class="govuk-table">
        <caption class="govuk-table__caption">Applications</caption>
        <thead class="govuk-table__head">
          <tr class="govuk-table__row">
            <th class="govuk-table__header" scope="col">Reference</th>
            <th class="govuk-table__header" scope="col">Address</th>
            <th class="govuk-table__header" scope="col">Created</th>
            <th class="govuk-table__header" scope="col">Updated</th>
            <th class="govuk-table__header" scope="col">Status</th>
            <th class="govuk-table__header" scope="col">Actions</th>
          </tr>
        </thead>
        <tbody class="govuk-table__body">
          <tr class="govuk-table__row" v-for="(application, index) in this.applications" v-bind:key="index">
            <td class="govuk-table__cell">{{application.reference}}</td>
            <td class="govuk-table__cell"><span v-if="application.site_address">{{ application.site_address.address_line_1 }}</span></td>
            <td class="govuk-table__cell">{{ generateDate(application.created_at) }}</td>
            <td class="govuk-table__cell">{{ generateDate(application.updated_at) }}</td>
            <td class="govuk-table__cell">{{application.status.name}}</td>
            <td class="govuk-table__cell"><router-link :to="{ name: 'ApplicationTaskOverview', params: { applicationId: application.id}}" class="govuk-link">View</router-link></td>
          </tr>
        </tbody>
      </table>

    </div>




  </div>
</template>

<script>
  export default {
    name: 'UserApplications',
    components: {
    },
    data() {
      return {
        applications: [],
        loading: true,
        error: false
      };
    },
    mounted() {
      this.getAllApplications();
    },
    methods: {
      generateDate(date) {
        let convertedDate = new Date(date);

        const finalDate = convertedDate.getUTCDate() + '/'+ (convertedDate.getUTCMonth() + 1) + '/' + convertedDate.getFullYear();

        return finalDate;
      },
      getAllApplications() {
        this.$store.dispatch('getAllApplications').then((response) => {

          if (response.error) {
            this.error = true;
            this.loading = false;
          } else {
            this.applications = response.data;
            this.loading = false;
          }
        });

      }
    }
  }
</script>
