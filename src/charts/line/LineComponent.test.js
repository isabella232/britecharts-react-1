import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import LineComponent from './LineComponent';
import lineData from './lineChart.fixtures';

import line from './lineChart';

Enzyme.configure({ adapter: new Adapter() });

describe('Line Chart Component', () => {

    describe('render', () => {

        describe('when data is not passed', () => {
            it('should throw an error', () => {
                expect(() => shallow(<LineComponent data={[]} />)).toThrow();
            });
        });

        describe('when data passed in', () => {
            let createSpy;

            beforeEach(() => {
                createSpy = jest.spyOn(line, 'create');
            });

            afterEach(() => {
                createSpy.mockReset();
                createSpy.mockRestore();
            });

            it('should call the create method or the chart', () => {
                mount(<LineComponent chart={line} data={lineData.fiveTopics()} />);

                const expected = 1;
                const actual = createSpy.mock.calls.length;

                expect(actual).toEqual(expected);
            });

            it('should call the create method or the chart with the container as the first argument', () => {
                const wrapper = mount(<LineComponent chart={line} data={lineData.fiveTopics()} />);

                const expected = wrapper.find('.line-container').instance();
                const actual = createSpy.mock.calls[0][0];

                expect(actual).toEqual(expected);
            });

            it('should call the create method or the chart with the configuration object as the second argument', () => {
                const dataSet = lineData.fiveTopics();

                mount(<LineComponent chart={line} data={dataSet} />);

                const expectedData = dataSet;
                const actualData = createSpy.mock.calls[0][1];

                expect(actualData).toEqual(expectedData);
            });

            it('should allow setting width', () => {
                const dataSet = lineData.fiveTopics();
                const expected = 500;

                mount(
                    <LineComponent
                        chart={line}
                        data={dataSet}
                        width={expected}
                    />
                );

                const actual = createSpy.mock.calls[0][2].width;

                expect(actual).toEqual(expected);
            });

            it('should allow setting height', () => {
                const dataSet = lineData.fiveTopics();
                const expected = 500;

                mount(
                    <LineComponent
                        chart={line}
                        data={dataSet}
                        height={expected}
                    />
                );

                const actual = createSpy.mock.calls[0][2].height;

                expect(actual).toEqual(expected);
            });
        });
    });

    describe('update', () => {

        describe('when data changes', () => {
            let updateSpy;

            beforeEach(() => {
                updateSpy = jest.spyOn(line, 'update');
            });

            afterEach(() => {
                updateSpy.mockReset();
                updateSpy.mockRestore();
            });

            it('should call the update method or the chart', () => {
                const wrapper = mount(<LineComponent chart={line} data={lineData.fiveTopics()} />);

                // Changing properties should trigger a componentDidUpdate
                wrapper.setProps({
                    data: lineData.oneSet(),
                });

                const expected = 1;
                const actual = updateSpy.mock.calls.length;

                expect(actual).toEqual(expected);
            });

            it('should pass in the new data to the update method', () => {
                const wrapper = mount(<LineComponent chart={line} data={lineData.fiveTopics()} />);

                // Changing properties should trigger a componentDidUpdate
                wrapper.setProps({
                    data: lineData.oneSet(),
                });

                const expected = lineData.oneSet().length;
                const actual = updateSpy.mock.calls[0][1].length;

                expect(actual).toEqual(expected);
            });

            it('should pass in the new configuration to the update method', () => {
                const wrapper = mount(<LineComponent chart={line} data={lineData.fiveTopics()} />);
                const expected = 20;

                // Changing properties should trigger a componentDidUpdate
                wrapper.setProps({
                    width: expected,
                });

                const actual = updateSpy.mock.calls[0][2].width;

                expect(actual).toEqual(expected);
            });
        });
    });

    describe('unmount', () => {
        let createSpy;

        beforeEach(() => {
            createSpy = jest.spyOn(line, 'destroy');
        });

        afterEach(() => {
            createSpy.mockReset();
            createSpy.mockRestore();
        });

        it('should call the destroy method or the chart', () => {
            const wrapper = mount(<LineComponent chart={line} data={lineData.fiveTopics()} />);

            wrapper.unmount();

            const expected = 1;
            const actual = createSpy.mock.calls.length;

            expect(actual).toEqual(expected);
        });
    });
});

