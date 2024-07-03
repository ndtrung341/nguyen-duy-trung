var sum_to_n_a = function (n) {
  // your code here
  let s = 0;
  for (let i = 1; i <= n; i++) s += i;
  return s;
};

var sum_to_n_b = function (n) {
  // your code here
  if (n === 0) return 0;
  return n + sum_to_n_b(n - 1);
};

var sum_to_n_c = function (n) {
  // your code here
  return (n * (n + 1)) / 2;
};
