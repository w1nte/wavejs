import "jasmine";
import {Config} from "../src/config";

describe("extend the config", () => {
    let config = new Config({
        value: 1,
        array: [1, 2, 3, 4],
        dictionary: {
            p1: 1,
            p2: 2
        }
    }, {
        value: 2,
        array: [1],
        dictionary: {
            p2: 3
        }
    });

    it("config correctly extended", () => {
        expect(config.getConfig()).toEqual({
            value: 2,
            array: [1],
            dictionary: {
                p1: 1,
                p2: 3
            }
        });
    });
});

describe("get config values", () => {
    let config = new Config({
        value: 1,
        array: [1, 2, 3, 4],
        dictionary: {
            p1: 1,
            p2: 2
        }
    });

    it("correct result by 'value'", () => {
        expect(config.get('value')).toBe(1);
    });

    it("correct result by 'array'", () => {
        expect(config.get('array')).toEqual([1, 2, 3, 4]);
    });

    it("correct result by 'not available'", () => {
        expect(config.get('fake')).toEqual(false);
    });
});