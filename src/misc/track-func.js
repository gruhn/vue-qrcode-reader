export function thinSquare({ color }) {
  return function(location, ctx) {
    const {
      topLeftCorner,
      topRightCorner,
      bottomLeftCorner,
      bottomRightCorner
    } = location;

    ctx.strokeStyle = color;

    ctx.beginPath();
    ctx.moveTo(topLeftCorner.x, topLeftCorner.y);
    ctx.lineTo(bottomLeftCorner.x, bottomLeftCorner.y);
    ctx.lineTo(bottomRightCorner.x, bottomRightCorner.y);
    ctx.lineTo(topRightCorner.x, topRightCorner.y);
    ctx.lineTo(topLeftCorner.x, topLeftCorner.y);
    ctx.closePath();

    ctx.stroke();
  };
}
