'use client';

import { DateRange, Range, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface CalenderProps {
    value: Range;
    disabledDates?: Date[];
    onChange: (value: RangeKeyDict) => void;
}
const Calender = ({ disabledDates, onChange, value }: CalenderProps) => {
    return (
        <DateRange
            rangeColors={['#262626']}
            ranges={[value]}
            date={new Date()}
            onChange={onChange}
            direction="vertical"
            showDateDisplay={false}
            minDate={new Date()}
            disabledDates={disabledDates}
        />
    );
};

export default Calender;
