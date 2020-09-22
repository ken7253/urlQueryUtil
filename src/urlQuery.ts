// Constant
const URL_QUERY_PARAMETER: string = decodeURIComponent(window.location.search);

// Interface
interface anyObj {
  [Array: string]: any;
};

// Function
const data = (dataType: string): string | Array<string> | object => {
  let result: string | Array<string> | object = "";

  switch (dataType) {
    case "string":
      result = URL_QUERY_PARAMETER;
      break;
    case "array":
      result = URL_QUERY_PARAMETER.slice(1).split("&");
      break;
    case "object":
      const arr = URL_QUERY_PARAMETER.slice(1).split("&");
      const obj: anyObj = {};
      arr.forEach((el) => {
        const tmpArr: Array<string> = el.split("=");
        obj[tmpArr[0]] = tmpArr[1];
      });
      result = obj;
      break;
    default:
      throw new Error("urlQuery.data argument is not a valid value.");
  }
  return result;
};

const setCssVar = (
  tagetProp: Array<string>,
  opt_taget: string = ":root"
): void => {
  const appendCssEl = document.createElement("style");
  const getDataObj: object = data("object");

  // Determine if the argument is "all"
  function isTagetPropAll(taget:Array<string>) {
    const isTagetAll: boolean = taget === ["all"] || taget === ["All"];
    return isTagetAll ? processAllProps() : processSomeProps();
  };

  // (isTagetAll === ture) tagetProp if "all" || "All"
  function processAllProps(): string {
    const result = convCssFormat();
    return result;
  };

  // (isTagetAll === fales) tagetProp if [prop_1,prop_2 ...]
  function processSomeProps() {
    propFilter();
    const result = convCssFormat(); 
    return result;
  };

  // getDataObj => filtered by tagetProp :Array
  function propFilter() {
    const filteredProp: anyObj = {};
    // Comparing data("object") and tagetProp
    for (let [key, value] of Object.entries(getDataObj)) {
      for (let item of tagetProp) {
        if (key === item) {
          filteredProp[key] = value;
          break;
        }
      };
    };
    return filteredProp;
  };

  // Convert object :object => css file :string
  function convCssFormat(): string {
    let innerCssText: string = `${opt_taget} {`;
    for (const [key, value] of Object.entries(getDataObj)) {
      innerCssText += ` --${key}: ${value};`;
    };
    innerCssText += " }";
    return innerCssText;
  };
};

// Export object
const urlQuery = {
  data,
  setCssVar,
};

export default urlQuery;
