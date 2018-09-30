import React, { Component } from 'react';

import JqxGrid, { jqx } from './assets/jqwidgets-react/react_jqxgrid';

import JqxLayout from './assets/jqwidgets-react/react_jqxlayout';

import JqxToolBar from './assets/jqwidgets-react/react_jqxtoolbar';

class App extends Component {
    render() {
        let tools = 'toggleButton toggleButton toggleButton | toggleButton | dropdownlist combobox | input | custom';
        let initTools = (type, index, tool, menuToolIninitialization) => {
            let icon = document.createElement('div');
            if (type === 'toggleButton') {
                icon.className = 'jqx-editor-toolbar-icon jqx-editor-toolbar-icon-arctic buttonIcon ';
            }
            switch (index) {
                case 0:
                    icon.className += 'jqx-editor-toolbar-icon-bold jqx-editor-toolbar-icon-bold-arctic';
                    icon.setAttribute('title', 'Bold');
                    tool[0].appendChild(icon);
                    break;
                case 1:
                    icon.className += 'jqx-editor-toolbar-icon-italic jqx-editor-toolbar-icon-italic-arctic';
                    icon.setAttribute('title', 'Italic');
                    tool[0].appendChild(icon);
                    break;
                case 2:
                    icon.className += 'jqx-editor-toolbar-icon-underline jqx-editor-toolbar-icon-underline-arctic';
                    icon.setAttribute('title', 'Underline');
                    tool[0].appendChild(icon);
                    break;
                case 3:
                    tool.jqxToggleButton({ width: 80, toggled: true });
                    tool[0].innerText = 'Enabled';
                    tool.on('click', () =>
                    {
                        let toggled = tool.jqxToggleButton('toggled');
                        if (toggled)
                        {
                            tool.text('Enabled');
                        } else
                        {
                            tool.text('Disabled');
                        }
                    });
                    break;
                case 4:
                    tool.jqxDropDownList({ width: 130, source: ["<span style='font-family: Courier New;'>Courier New</span>", "<span style='font-family: Times New Roman;'>Times New Roman</span>", "<span style='font-family: Verdana;'>Verdana</span>"], selectedIndex: 1 });
                    break;
                case 5:
                    tool.jqxComboBox({ width: 50, source: [8, 9, 10, 11, 12, 14, 16, 18, 20], selectedIndex: 3 });
                    break;
                case 6:
                    tool.jqxInput({ width: 200, placeHolder: 'Type here to search...' });
                    break;
                case 7:
                    let button = document.createElement('div');
                    button.innerHTML = "<img src='../../../../images/administrator.png' title='Custom tool' />";
                    tool[0].appendChild(button);
                    tool.jqxButton({ height: 15 });
                    break;
                default:
                    break;
            }
        }
        const layout = [{
            type: 'layoutGroup',
            orientation: 'horizontal',
            items: [{
                type: 'layoutGroup',
                orientation: 'vertical',
                width: 900,
                items: [{
                    type: 'documentGroup',
                    height: 35,
                    minHeight: 35,
                    items: [{
                        type: 'documentPanel',
                        title: 'Toolbar 1',
                        contentContainer: 'Toolbar1Panel'
                    }]
                },
                {
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
            <div>
                <JqxLayout width={1200} height={700} layout={layout}>
                    <div data-container='Toolbar1Panel'>
                    <JqxToolBar
                        width={800} height={35}
                        initTools={initTools} tools={tools}
                        />
                    </div>
                    <div data-container='Document1Panel'>Document 1 content
                        <JqxGrid 
                            width={900} source={dataAdapter} columns={columns}
                            pageable={true }autoheight={true} sortable={true}
                            altrows={true} enabletooltips={true} editable={true}
                            selectionmode={'multiplecellsadvanced'} columngroups={columngroups}
                        />
                    </div>
                    <div data-container='OutputPanel'></div>
                    <div data-container='SolutionExplorerPanel'></div>
                    <div data-container='PropertiesPanel'>List of properties</div>
                </JqxLayout>
            </div>
        );
    }
}

export default App;