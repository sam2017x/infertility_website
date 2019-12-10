import React, { useState } from 'react';
import ReactTable from 'react-table';
import axios from 'axios';
import XlsExport from 'xlsexport';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import fi from 'date-fns/locale/fi';
import Button from '../components/Button';
import translate from '../util/localization/i18n';

// import logger, { loggerInstance } from '../../../server/logger';

const dateFormat = 'dd.MM.yyyy';

const columns = [{
  Header: translate('admin_country'),
  accessor: 'country'
}, {
  Header: 'Id',
  accessor: 'stimulationId'
}, {
  Header: translate('admin_status'),
  accessor: 'status'
}, {
  Header: translate('admin_diagnosis'),
  accessor: 'diagnosis'
}, {
  Header: translate('admin_age'),
  accessor: 'age'
}, {
  Header: translate('admin_dose'),
  accessor: 'dose'
}, {
  Header: translate('admin_oocytes'),
  accessor: 'oocytes'
}, {
  Header: translate('admin_cleaving'),
  accessor: 'cleaving'
}, {
  Header: translate('admin_top'),
  accessor: 'top'
}, {
  Header: translate('admin_stimulation'),
  accessor: 'stimulation'
}, {
  Header: translate('admin_cumulative_probability'),
  accessor: 'cumulativeProbability'
}, {
  Header: translate('admin_probability'),
  accessor: 'probability'
}, {
  id: 'createdAt',
  Header: translate('admin_date'),
  accessor: (data) => {
    const date = new Date(data.createdAt);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  }
}];


class Admin extends React.Component {
  constructor(props) {
    super(props);
    registerLocale('fi', fi);
    setDefaultLocale('fi');

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 14);
    startDate.setHours(0, 0, 0, 0);


    this.state = {
      data: [],
      page: 0,
      pages: 1,
      pageSize: 20,
      loading: false,
      sorted: [],
      endDate,
      startDate,
      filter: { createdAt: { $gte: startDate, $lt: endDate } }
    };
  }

  componentDidMount() {
    if (window.localStorage.getItem('token') === null) {
      this.props.setView('login');
    }
  }

  formatSort = (sort) => {
    const sortObj = {};
    sort.forEach((column) => { sortObj[column.id] = column.desc ? 1 : -1; });
    return sortObj;
  };

  handleClick = () => {
    const xls = new XlsExport(this.state.data, `LumiData${new Date().toLocaleDateString()}`);
    xls.exportToXLS(`LumiData${new Date().toLocaleDateString()}`);
  };

  handleStartDateChange = (date) => {
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    this.setState({ startDate: date });
  }

  handleEndDateChange = (date) => {
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 59);
    this.setState({ endDate });
  }

  handleSetDates = () => {
    this.setState({ filter: { createdAt: { $gte: this.state.startDate.toISOString(), $lt: this.state.endDate.toISOString() } } }, () => this.refReactTable.fireFetchData());
  }

  render() {
    return (
      <div className="admin">
        <form className="adminDatePicker">
          <label htmlFor="startDate">
            { translate('admin_start_date') }
            :
            <DatePicker className="startDate" selected={this.state.startDate} onChange={this.handleStartDateChange} dateFormat={dateFormat} id="startDate" />
          </label>
          <label htmlFor="endDate">
            { translate('admin_end_date') }
            :
            <DatePicker className="endDate" selected={this.state.endDate} onChange={this.handleEndDateChange} dateFormat={dateFormat} />
          </label>
          
          <Button className="setDatesButton" type="button" onClick={this.handleSetDates} id="setDates" value={translate('admin_filter')} />
          
        </form>
        <div className="tableDiv">
          <ReactTable
            ref={(refReactTable) => { this.refReactTable = refReactTable; }}
            className="-striped -highlight"
            data={this.state.data}
            columns={columns}
            loading={this.state.loading}
            pages={this.state.pages}
            page={this.state.page}
            manual
            defaultSorted={[{ id: 'createdAt', desc: false }]}
            onFetchData={(state, instance) => {
              this.setState({ loading: true });
              axios.post('/api/documents/all',
                { page: state.page,
                  limit: state.pageSize,
                  sort: this.formatSort(state.sorted),
                  filter: this.state.filter },
                { headers:
                { Authorization: `Bearer ${localStorage.getItem('token')}` } }).then((res) => {
                this.setState({
                  data: res.data.rows,
                  page: res.data.page,
                  pages: Math.ceil(res.data.count / state.pageSize),
                  loading: false
                });
              });
            }}
          />
        </div>
        <Button
          className="excel-button"
          type="button"
          onClick={this.handleClick}
          id="export"
          value={translate('admin_export')}
        />
      </div>
    );
  }
}

export default Admin;
