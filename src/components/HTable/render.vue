<script>
export default {
  name: 'FreeRender',
  functional: true,
  props: {
    scope: {
      type: Object,
      required: true
    },
    render: {
      type: Function,
      required: true
    }
  },
  render: (h, ctx) => {
    return ctx.props.render ? ctx.props.render(h, ctx.props.scope) : ''
  }
}
</script>
