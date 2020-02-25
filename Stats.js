import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component'
export default class StatScreen extends React.Component {
  static navigationOptions = {
            title: 'Statistics',
     };
    constructor(props) {
        super(props);
        this.state = {
          tableHead: ['', '', '', 'Head3'],
          tableTitle: ['Matches Played', 'Won', 'Lost', 'Blah'],
          tableData: [
            ['', '', '3'],
            ['', '', 'c'],
            ['', '', '3'],
            ['', '', 'c']
          ]
        }
      }
    
      render() {
        const state = this.state;
        return (
          <View style={styles.container}>
            <Table>
              <Row data={state.tableHead} flexArr={[1, 2, 1, 1]} style={styles.head} textStyle={styles.text}/>
              <TableWrapper style={styles.wrapper}>
                <Col data={state.tableTitle} style={styles.title} heightArr={[28,28]} textStyle={styles.text}/>
                <Rows data={state.tableData} flexArr={[2, 1, 1]} style={styles.row} textStyle={styles.text}/>
              </TableWrapper>
            </Table>
          </View>
        )
      }
    }
    
    const styles = StyleSheet.create({
      container: { flex: 1, padding: 0, paddingTop: 0, backgroundColor: '#fff' },
      head: {  height: 40,  backgroundColor: '#f6f8fa'  },
      wrapper: { flexDirection: 'row' },
      title: { flex: 2, backgroundColor: '#f6f8fa' },
      row: {  height: 28, backgroundColor: '#f6f8fa'  },
      text: { textAlign: 'center' }
    });

