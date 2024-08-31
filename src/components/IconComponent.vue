<script>
import { h } from "vue";
import InlineSvg from "vue-inline-svg";

export default {
  name: "IconComponent",
  props: {
    name: String,
    category: {
      type: String,
      default: "remix",
    },
  },
  setup(props) {
    let error = false;
    let template = false;
    if (!error) {
      template = h(
        "figure",
        {
          class: `icon ${props.category}-${props.name}-icon`,
        },
        h(InlineSvg, {
          src: `/public/assets/svg/${props.category}/${props.name}.svg`,
          onError: () => {
            error = true;
          },
        })
      );
    }
    return () => template;
  },
  data: () => ({
    error: false,
  }),
};
</script>
