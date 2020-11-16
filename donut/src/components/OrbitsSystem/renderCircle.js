const round = (number) => Math.round(number * 1e6) / 1e6;
const renderCircle = (radius, numOfVertexes, posX, posY) => {
  let vertexes = [];
  for (let i = 0; i <= numOfVertexes; i++) {
    let radians = ((Math.PI * 2) / numOfVertexes) * i;
    let cosx = round(Math.cos(radians));
    let siny = round(Math.sin(radians));
    let x = cosx * radius + posX;
    let y = siny * radius + posY;
    if (i === 0) {
      // Set M point
      const string = `M ${x}, ${y}`;
      vertexes[i] = { x, y, string, radians };
      continue;
    }
    let armLength = (4 / 3) * Math.tan(Math.PI / (2 * numOfVertexes));
    let armLengthScaled = armLength * radius;
    let firstArmRadians = vertexes[i - 1].radians + Math.PI / 2; // angle + 90 from the previous point angle
    let secondArmRadians = radians - Math.PI / 2; // angle + 90 from cur point
    let cosx1 = round(Math.cos(firstArmRadians));
    let cosx2 = round(Math.cos(secondArmRadians));
    let siny1 = round(Math.sin(firstArmRadians));
    let siny2 = round(Math.sin(secondArmRadians));
    let x1 = cosx1 * armLengthScaled + vertexes[i - 1].x;
    let x2 = cosx2 * armLengthScaled + x;
    let y1 = siny1 * armLengthScaled + vertexes[i - 1].y;
    let y2 = siny2 * armLengthScaled + y;
    const string = `C ${x1}, ${y1} ${x2}, ${y2} ${x}, ${y}`;
    vertexes[i] = { x, y, string, radians };
    if (i === numOfVertexes)
      // Setup end
      vertexes[i + 1] = { string: "Z" };
  }
  let matrix = vertexes.map((vertex) => vertex.string);
  return matrix.join("\n");
};

export default renderCircle;
