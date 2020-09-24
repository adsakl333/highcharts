/* *
 *
 *  Data Layer
 *
 *  (c) 2012-2020 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
/* *
 *
 *  Imports
 *
 * */
import DataTable from './DataTable.js';
/* *
 *
 *  Class
 *
 * */
/**
 * Class to convert between common value types.
 */
var DataConverter = /** @class */ (function () {
    function DataConverter() {
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Converts a value to a boolean.
     *
     * @param {DataConverter.Type} value
     * Value to convert.
     *
     * @return {boolean}
     * Converted value as a boolean.
     */
    DataConverter.prototype.asBoolean = function (value) {
        if (typeof value === 'boolean') {
            return value;
        }
        if (typeof value === 'string') {
            return value !== '' && value !== '0' && value !== 'false';
        }
        return this.asNumber(value) !== 0;
    };
    /**
     * Converts a value to a DataTable.
     *
     * @param {DataConverter.Type} value
     * Value to convert.
     *
     * @return {DataTable}
     * Converted value as a DataTable.
     */
    DataConverter.prototype.asDataTable = function (value) {
        if (value instanceof DataTable) {
            return value;
        }
        if (typeof value === 'string') {
            try {
                return DataTable.fromJSON(JSON.parse(value));
            }
            catch (error) {
                return new DataTable();
            }
        }
        return DataTable.fromJSON({
            $class: 'DataTable',
            rows: [{
                    $class: 'DataTableRow',
                    cells: [JSON.parse((value === null || value === void 0 ? void 0 : value.toString()) || '')]
                }]
        });
    };
    /**
     * Converts a value to a Date.
     *
     * @param {DataConverter.Type} value
     * Value to convert.
     *
     * @return {globalThis.Date}
     * Converted value as a Date.
     */
    DataConverter.prototype.asDate = function (value) {
        if (typeof value === 'string') {
            return new Date(value);
        }
        return new Date(this.asNumber(value));
    };
    /**
     * Converts a value to a number.
     *
     * @param {DataConverter.Type} value
     * Value to convert.
     *
     * @return {number}
     * Converted value as a number.
     */
    DataConverter.prototype.asNumber = function (value) {
        if (typeof value === 'number') {
            return value;
        }
        if (typeof value === 'boolean') {
            return value ? 1 : 0;
        }
        if (typeof value === 'string') {
            return parseFloat("0" + value);
        }
        if (value instanceof DataTable) {
            return value.getRowCount();
        }
        if (value instanceof Date) {
            return value.getDate();
        }
        return 0;
    };
    /**
     * Converts a value to a string.
     *
     * @param {DataConverter.Type} value
     * Value to convert.
     *
     * @return {string}
     * Converted value as a string.
     */
    DataConverter.prototype.asString = function (value) {
        return "" + value;
    };
    return DataConverter;
}());
/* *
 *
 *  Export
 *
 * */
export default DataConverter;
