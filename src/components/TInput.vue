<template>
  <div class="input-parent">
    <span class="tinput-label" v-if="label">{{ label }}</span>
    <input
      :type="type"
      class="tinput"
      :id="model"
      @blur="updatestatus"
      :disabled="isdisable"
      :value="value"
    />
    <span class="tinput-error" v-if="errorstatus">{{ errortext }}</span>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: false, default: null },
    label: { type: String, required: false, default: null },
    fieldvalue: { type: [String, Number], required: false, default: null },
    rule: { type: String, required: false, default: null },
    errortext: { type: String, required: false, default: "! Incorrect Entry" },
    type: { type: String, required: false, default: "text" },
    model: { type: String, required: true, default: null },
    isdisable: { type: Boolean, required: false, default: false },
    value: { type: String, required: false, default: null }
  },
  data() {
    return {
      errorstatus: false
    };
  },
  mounted() {
    if (this.$props.fieldvalue) {
      document.getElementById(this.$props.model).value = this.$props.fieldvalue;
    }
  },
  computed: {
    // verifyrule() {
    //   console.log("hiihi");
    //   if (this.$props.rule) {
    //     console.log("object");
    //     return new RegExp(this.$props.rule).test(
    //       document.getElementById(this.$props.model).value
    //     );
    //   } else {
    //     return true;
    //   }
    // }
  },
  methods: {
    updatestatus() {
      var rulei = this.$props.rule;
      var modeli = this.$props.model;
      if (rulei && modeli) {
        if (RegExp(rulei).test(document.getElementById(modeli).value)) {
          this.errorstatus = false;
        } else {
          this.errorstatus = true;
        }
      } else {
        return true;
      }
    }
  }
};
</script>

<style scoped>
.input-parent {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 10px 0;
}
.tinput {
  border: none;
  background-color: #fffaf7;
  outline: none;
  height: 40px;
  padding: 0px 10px;
  border-bottom: 1px solid black;
  margin: 5px 0;
}
.tinput-label {
  font-size: 16px;
  padding: 0 0px;
}
.tinput-error {
  font-size: 12px;
  color: red;
  font-weight: bold;
}
</style>
