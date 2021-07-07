interface Named<T> {
  name: string;
}
class MyNamed<T> implements Named<T> {
  name: 'mine';
}
function findByName<T>(x: Named<T>): T {
  // TODO: Implement
  return undefined;
}

var x: MyNamed<string>;
var y = findByName(x); // expected y: string, got y: {}

console.log(y,111)