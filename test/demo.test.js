/**
 * @description test demo
 * @author sylviayang
 */

function sum(a, b) {
  return a + b
}

test('10 + 20 should be 30', () => {
  const res = sum(10, 20)
  expect(res).toBe(30)
})