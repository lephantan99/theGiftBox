import { FormWrapper, InputWrapper } from '~/components/common/Templates/Form'
export default {
  components: {
    FormWrapper,
    InputWrapper,
  },
  watch: {
    form: {
      deep: true,
      handler() {
        const result = {}
        Object.keys(this?.form).forEach((key) => {
          if (this.form[key]) {
            // Example: fullName: { $ilike: this.form.fullName }
            // Nếu có trong filter map thì làm theo kiểu filter với object
            // Nếu không thì gắn thẳng giá trị filter vào
            result[key] = this.filterMap[key]
              ? {
                  // $ilike:
                  [this.filterMap[key]]:
                    // Nếu giá trị là chuỗi thì trim()
                    typeof this.form[key] === 'string'
                      ? this.form[key].trim() // Trim the string
                      : this.form[key],
                }
              : this.form[key]
          }
        })
        this.filter =
          JSON.stringify(result) === '{}' ? null : JSON.stringify(result)
      },
    },
  },
  methods: {
    fillFormFromQuery(query) {
      if (query && query.filter) {
        Object.keys(this.filterMap).forEach((key) => {
          const queryFilter =
            typeof query.filter === 'string'
              ? JSON.parse(query.filter)
              : query.filter
          if (queryFilter[key]) {
            // this.form.fullName = query.filter.fullName.$ilike
            this.form[key] = queryFilter[key][this.filterMap[key]]
          }
        })
      }
    },
  },
}
