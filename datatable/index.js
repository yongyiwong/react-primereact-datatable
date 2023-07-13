import Spinner from 'components/Spinner'
import { filterApplyTemplate, filterClearTemplate } from 'pages/properties/formatters'
import { PropertyWrapper } from 'pages/properties/styles'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { forwardRef, useImperativeHandle } from 'react'
import { IPropertyTableProps } from 'util/commonTypes'

const PropertyTable = forwardRef(
  (
    {
      columns,
      filters,
      apartments,
      properties,
      totalItems,
      setElement,
      currentView,
      isActivated,
      onFilterChange,
      isDataFetching,
      isRowSelectable,
      apartmentsTotal,
      selectedProducts,
      currentSelectedItem,
      setSelectedProducts,
      onTogglePropertyDocuments,
    }: IPropertyTableProps,
    ref
  ) => {
    useImperativeHandle(
      ref,
      () => ({
        columns,
      }),
      []
    )

    return (
      <PropertyWrapper currentView={currentView} hasSelection={currentSelectedItem}>
        <DataTable
          resizableColumns
          filters={filters}
          onFilter={(event) => onFilterChange(event.filters)}
          onRowClick={(rowEvent) =>
            onTogglePropertyDocuments(rowEvent.originalEvent, rowEvent.data)
          }
          value={properties}
          columnResizeMode="fit"
          dataKey="id"
          selectionMode="checkbox"
          responsiveLayout="scroll"
          isDataSelectable={isRowSelectable}
          emptyMessage={
            (isActivated && +apartmentsTotal === 0) || isDataFetching
              ? ' '
              : 'No available property found'
          }
          selection={selectedProducts}
          onSelectionChange={(selection) => setSelectedProducts(selection.value)}
          scrollHeight="flex"
        >
          {columns.map((each: any) => (
            <Column
              key={each?.field}
              body={each?.body}
              style={{ ...each.style, display: each?.isShow ? 'table-cell' : 'none' }}
              field={each.field}
              filter={each?.filter}
              frozen={each?.frozen}
              columnKey={each?.field}
              dataType={each?.dataType}
              sortable={each?.sortable}
              headerStyle={each.headerStyle}
              alignFrozen={each?.alignFrozen}
              filterField={each?.filterField}
              filterApply={filterApplyTemplate}
              filterClear={filterClearTemplate}
              filterElement={each?.filterElement}
              selectionMode={each?.selectionMode}
              headerClassName={each?.headerClassName}
              filterMenuStyle={each?.filterMenuStyle}
              filterPlaceholder={each?.filterPlaceholder}
              header={!each?.selectionMode ? each.header : ''}
              showFilterMatchModes={each?.showFilterMatchModes}
            />
          ))}
        </DataTable>
        {apartments?.length < totalItems && (
          <div className="spinnerLoader" ref={setElement}>
            <Spinner />
          </div>
        )}
      </PropertyWrapper>
    )
  }
)

export default PropertyTable