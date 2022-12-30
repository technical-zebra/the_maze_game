export function updateReal(direction, realPosition) {
    const newRealPosition = [0, 0];
    switch (direction) {
        case "up":
            newRealPosition[0] = realPosition[0];
            newRealPosition[1] = realPosition[1] - 20;
            break;
        case "right":
            newRealPosition[0] = realPosition[0] + 20;
            newRealPosition[1] = realPosition[1]
            break;
        case "down":
            newRealPosition[0] = realPosition[0];
            newRealPosition[1] = realPosition[1] + 20;
            break;
        case "left":
            newRealPosition[0] = realPosition[0] - 20;
            newRealPosition[1] = realPosition[1];
            break;
        default:
            newRealPosition[0] = realPosition[0];
            newRealPosition[1] = realPosition[1];
    }
    return newRealPosition;
}

export function updateVirtual(direction, realPosition) {
    const virtualPosition = [0, 0];
    switch (direction) {
        case "up":
            virtualPosition[0] = realPosition[0];
            virtualPosition[1] = realPosition[1] - 1;
            break;
        case "right":
            virtualPosition[0] = realPosition[0] + 1;
            virtualPosition[1] = realPosition[1]
            break;
        case "down":
            virtualPosition[0] = realPosition[0];
            virtualPosition[1] = realPosition[1] + 1;
            break;
        case "left":
            virtualPosition[0] = realPosition[0] - 1;
            virtualPosition[1] = realPosition[1];
            break;
        default:
            virtualPosition[0] = realPosition[0];
            virtualPosition[1] = realPosition[1];
    }
    return virtualPosition;
}