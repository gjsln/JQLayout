import React, { Component } from 'react';

import JqxGrid, { jqx } from './assets/jqwidgets-react/react_jqxgrid';

import JqxLayout from './assets/jqwidgets-react/react_jqxlayout';

class App extends Component {
    render() {
        const layout = [{
            type: 'layoutGroup',
            orientation: 'horizontal',
            items: [{
                type: 'layoutGroup',
                orientation: 'vertical',
                width: 900,
                items: [{
                    type: 'documentGroup',
                    height: 450,
                    minHeight: 250,
                    items: [{
                        type: 'documentPanel',
                        title: 'Document 1',
                        contentContainer: 'Document1Panel'
                    }]
                }, {
                    type: 'tabbedGroup',
                    height: 250,
                    pinnedHeight: 30,
                    items: [{
                        type: 'layoutPanel',
                        title: 'Output',
                        contentContainer: 'OutputPanel',
                        selected: true
                    }]
                }]
            },{
                type: 'tabbedGroup',
                width: 300,
                minWidth: 250,
                items: [{
                    type: 'layoutPanel',
                    title: 'Solution Explorer',
                    contentContainer: 'SolutionExplorerPanel'
                }, {
                    type: 'layoutPanel',
                    title: 'Properties',
                    contentContainer: 'PropertiesPanel'
                }]
            }]
        }];

        const source =
            {
                datatype: 'xml',
                datafields: [
                    { name: 'ProductName', type: 'string' },
                    { name: 'QuantityPerUnit', type: 'int' },
                    { name: 'UnitPrice', type: 'float' },
                    { name: 'UnitsInStock', type: 'float' },
                    { name: 'Discontinued', type: 'bool' }
                ],
                root: 'Products',
                record: 'Product',
                id: 'ProductID',
                url: './assets/products.xml'
            };

        const dataAdapter = new jqx.dataAdapter(source);

        const cellsrenderer = (row, columnfield, value, defaulthtml, columnproperties, rowdata) => {
            if (value < 20) {
                return `<span style='margin: 4px; float:${columnproperties.cellsalign}; color: #ff0000;'>${value}</span>`;
            }
            else {
                return `<span style='margin: 4px; float:${columnproperties.cellsalign}; color: #008000;'>${value}</span>`;
            }
        };

        const columns=
            [
                { text: 'Product Name', columngroup: 'ProductDetails', datafield: 'ProductName', width: 250 },
                { text: 'Quantity per Unit', columngroup: 'ProductDetails', datafield: 'QuantityPerUnit', cellsalign: 'right', align: 'right' },
                { text: 'Unit Price', columngroup: 'ProductDetails', datafield: 'UnitPrice', align: 'right', cellsalign: 'right', cellsformat: 'c2' },
                { text: 'Units In Stock', datafield: 'UnitsInStock', cellsalign: 'right', cellsrenderer: cellsrenderer, width: 100 },
                { text: 'Discontinued', columntype: 'checkbox', datafield: 'Discontinued', align: 'center' }
            ];

        const columngroups =
            [
                { text: 'Product Details', align: 'center', name: 'ProductDetails' }
            ];   
        return (
            <JqxLayout width={1200} height={700} layout={layout}>
                <div data-container='Document1Panel'>Document 1 content
                    <JqxGrid 
                        width={850} source={dataAdapter} columns={columns}
                        pageable={true }autoheight={true} sortable={true}
                        altrows={true} enabletooltips={true} editable={true}
                        selectionmode={'multiplecellsadvanced'} columngroups={columngroups}
                    />
                </div>
                <div data-container='OutputPanel'></div>
                <div data-container='SolutionExplorerPanel'></div>
                <div data-container='PropertiesPanel'>List of properties</div>
            </JqxLayout>
        );
    }
}

export default App;