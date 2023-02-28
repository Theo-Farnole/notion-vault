type EaseFunction = (x: number) => number

export function easeValue(
    onIncrement: (newValue: number) => void,
    endValue: number,
    endTimeMS: number,
    intervalUpdateMS: number = 500,
    easeFunction: EaseFunction = easeOutSine) {


    let elapsedTime = 0; // from 0 to endTime    

    const interval = setInterval(() => {
        const progression = elapsedTime / endTimeMS; // from 0 to 1
        onIncrement(easeFunction(progression) * endValue);

        elapsedTime += intervalUpdateMS;

        if (progression === 1) {
            clearInterval(interval);
        }
    }, intervalUpdateMS);

    return interval;
}


// more ease functions at https://easings.net/

function easeOutSine(x: number): number {
    return Math.sin((x * Math.PI) / 2);
}