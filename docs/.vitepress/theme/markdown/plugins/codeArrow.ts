import MarkdownIt from "markdown-it";
import arrowSvg from "../../assets/svg/arrow";

/**
 * 添加箭头图标到代码块中
 *
 * @param md MarkdownIt 实例
 */
const codeArrow = (md: MarkdownIt) => {
  const fence = md.renderer.rules.fence!;

  md.renderer.rules.fence = function (tokens, idx, options, env, self) {
    return fence(tokens, idx, options, env, self).replace(
      /(<button title="[^"]*" class="[^"]*copy[^"]*"><\/button>)/,
      `<div class="arrow">${arrowSvg}</div>$1`
    );
  };
};

export default codeArrow;
