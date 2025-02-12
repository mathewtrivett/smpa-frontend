<template>
	<div>
    <h1 class="govuk-heading-xl">
      About the floor area
    </h1>
		<div class="govuk-form-group">
      <fieldset class="govuk-fieldset" aria-describedby="proposal-hint">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h2 class="govuk-heading-m">
            How much floor area is being added?
          </h2>
        </legend>

        <div class="govuk-inset-text">
          <p class="govuk-body govuk-!-font-weight-bold">Definition</p>
          <p>Additional floor area should be measured according to the definition of Gross internal area (GIA). Broadly speaking this includes the whole enclosed area of a building within the external walls taking each floor into account.</p>
          <details class="govuk-details">
            <summary class="govuk-details__summary">
              <span class="govuk-details__summary-text">
                What to include and not include
              </span>
            </summary>
            <div class="govuk-details__text">
              Include:<br>
              <ul>
                <li>areas occupied by internal walls (whether structural or not) and partitions</li>
                <li>service accommodation such as WCs, showers and changing rooms</li>
                <li>columns, pillars (whether free standing or projecting inwards from an external wall), chimney breasts, lift wells and stairwells</li>
                <li>lift rooms, plant rooms, tank rooms and fuel stores (whether or not above roof level)</li>
                <li>open-sided covered areas</li>
              </ul>

              Don't include:
              <ul>
                <li>open balconies</li>
                <li>open fire escapes</li>
                <li>open-sided covered ways</li>
                <li>open vehicle parking areas and terraces</li>
                <li>minor canopies</li>
                <li>any area with ceiling height of less than 1.5m (except under stairways)</li>
                <li>any area under the control of service or other external authorities</li>
              </ul>
            </div>
          </details>
        </div>

        <div class="govuk-form-group">
          <label class="govuk-label govuk-!-width-one-third" for="one-quarter">
            Additional floor area
          </label>
          <input class="govuk-input govuk-!-width-one-quarter" id="one-quarter" name="one-quarter" type="number" v-model="floorArea"> 
          
          <select class="govuk-select" id="sort" name="sort" v-model="selectedOption">
            <option v-bind:value="option.id" v-bind:key="option.id" v-for="option in this.defaultOptions">{{option.name}}</option>
          </select>
        </div>
      </fieldset>
    </div>

    <error-message v-if="showErrorMessage && !loading" :message="errorMessages.FLOOR_AREA.GENERIC_ERROR"></error-message>

		<v-cta name="Continue" :onClick="checkAnswers"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';
import FreeDescription from '../../components/FreeDescription.vue';
import { getRouteAppId } from '../../mixins/getRouteAppId';
import ErrorMessage from '../../components/ErrorMessage.vue';
import * as errorMessage from '../../messages/errorMessages';

export default {
  name: 'WorksFloorArea',
  mixins: [ getRouteAppId ],
	components: {
    vCta,
    FreeDescription,
    ErrorMessage
  },
  data () {
    return {
      floorArea: undefined,
      selectedOption: '',
      defaultOptions: undefined,
      showErrorMessage: false,
      errorMessages: undefined
    }
  },
  watch: {
    application () {
			this.loadExistingAnswers();
		}
  },
  created () {
    this.errorMessages = errorMessage;
  },
  beforeMount () {
    this.loadDefaultOptions();
  },
	methods: {
    checkAnswers () {
      if (this.floorArea === this.application.data.proposal_extension.additional_floor_area && this.selectedOption === this.application.data.proposal_extension.additional_floor_area_units_id) {
        this.navigate();
      } else {
        this.submit();
      }
    },
    loadExistingAnswers () {
      if (this.application.data.proposal_extension.additional_floor_area) {
        this.floorArea = this.application.data.proposal_extension.additional_floor_area;
      }

      if (this.application.data.proposal_extension.additional_floor_area_units_id) {
        this.selectedOption = this.application.data.proposal_extension.additional_floor_area_units_id;
      }
		},
    navigate() {
      router.push({ name: 'WorksData' });
    },
    loadDefaultOptions() {
      this.$store.dispatch('getDefaultData', 'area-units').then((response) => {
        if (response.error) {
          this.showErrorMessage = true;
          return;
        } else {
          this.defaultOptions = response.data;
        }
      })
    },
    submit() {
      let payload = {
        "additional_floor_area_units_id": this.selectedOption,
        "additional_floor_area": this.floorArea
      };

      const extensionId = this.$store.getters.getExtensionId(this.applicationId);

      this.$store.dispatch('updateExtensionProposal', { 
        "application_id": this.applicationId, 
        'selectedProposals': payload, 
        "extension_id": extensionId }).then((response) => {
        
        if (response.error) {
          this.showErrorMessage = true;
          return;
        } else {
          this.navigate();
        }
      })
    }
  },
  computed: {
    application () {
      let index = this.$store.state.state.applications.findIndex( application => application.data.id === this.applicationId );
			return this.$store.state.state.applications[index];
    }
  }
}
</script>