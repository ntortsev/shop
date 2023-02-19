const useMobileMask = () => {
  return (value: string, oldValue: string) => {
    if (/[a-z]/gi.test(value)) return oldValue;
    let nums = value.match(/\d/g)?.join('');

    if (value.length < oldValue.length) {
      return value;
    } else if (nums) {
      let result = `(${nums.slice(0, 3)}`;
      if (nums.length >= 3) result += `)${nums.slice(3, 6)}`;
      if (nums.length >= 6) result += `-${nums.slice(6, 8)}`;
      if (nums.length >= 8) result += `-${nums.slice(8, 10)}`;

      return result;
    } else return oldValue;
  };
};

export default useMobileMask;
