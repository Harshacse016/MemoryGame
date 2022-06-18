import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, FlatList, StatusBar } from 'react-native'
import { ShuffleData } from "../utils/shuffleData";
import { MATCHES_STORAGE_KEY_NAME, maxNumberOfCards } from "../utils/constants";
import { theme } from "../utils/theme";
import AppAsyncStorage from "../utils/AppAsyncStorage";
import winningDialog from "../hoc/winningDialog";

const HomeScreen = ({
    showWinningDialog,
}) => {

    const [data, setData] = useState([])
    const [matches, setMatches] = useState(0)
    const [turns, setTurns] = useState(0)
    const [card, setCard] = useState([])
    const [disableOnClick, setDisableOnClick] = useState(false)

    const getNumberOfMatches = async () => {
        const noOfMatches = await AppAsyncStorage.getValue(MATCHES_STORAGE_KEY_NAME)
        if (noOfMatches === null)
            setMatches(0)
        else
            setMatches(JSON.parse(noOfMatches))
    }

    const storeNumberOfMatches = async () => {
        await AppAsyncStorage.setValue(MATCHES_STORAGE_KEY_NAME, JSON.stringify(matches))
    }

    useEffect(() => {
        getNumberOfMatches()
        setData(ShuffleData())
    }, [])

    const resetData = () => {
        setTurns(0)
        setData(ShuffleData())
        setCard([])
        setDisableOnClick(false)
    }

    useEffect(() => {
        clear()
    }, [card])

    const clear = () => {
        const length = card.length
        if (length == maxNumberOfCards) {
            setMatches(matches + 1)
            storeNumberOfMatches()
            resetData()
            showWinningDialog(turns)
        } else if (length % 2 == 0 && length != 0) {
            setDisableOnClick(true)
            const lastTwoElements = card.slice(-2)
            const renderData = [...data]
            if (renderData[lastTwoElements[0]].name != renderData[lastTwoElements[1]].name) {
                setTimeout(() => {
                    renderData[lastTwoElements[0]].visible = false
                    renderData[lastTwoElements[1]].visible = false

                    let removeLastTowElementsFromCard = [...card]
                    removeLastTowElementsFromCard = card.slice(0, -2)
                    setCard(removeLastTowElementsFromCard)

                    setDisableOnClick(false)
                }, 500);
            } else {
                setTimeout(() => {
                    setDisableOnClick(false)
                }, 500);
            }
        }
    }

    const onItemClickListener = (item, index) => {
        if (!disableOnClick) {
            setTurns(turns + 1)
            const renderData = [...data]
            renderData[index].visible = true
            setData(renderData)

            let tmpCard = [...card]
            tmpCard.push(index)
            setCard(tmpCard)
        }
    }

    const renderItem = ({ index, item }) => {
        return (
            <>
                <TouchableOpacity style={styles.item} onPress={() => onItemClickListener(item, index)}>
                    {
                        item.visible ? <Text style={styles.itemText}>{item.name}</Text> : null
                    }
                </TouchableOpacity>
            </>
        )
    }


    return (
        <View style={styles.rootContainer}>
            <StatusBar
                barStyle="light-content"
                hidden={false}
                backgroundColor={theme.colors.secondaryNavy}
            />
            <View style={styles.resultContainer}>
                <View style={styles.matchesViewContainer}>
                    <Text style={styles.matchesTextContainer}>Matches</Text>
                    <Text style={styles.matchesTextContainer}>{matches}</Text>
                </View>

                <View style={styles.matchesViewContainer}>
                    <Text style={styles.matchesTextContainer}>Turns</Text>
                    <Text style={styles.matchesTextContainer}>{turns}</Text>
                </View>
            </View>

            <FlatList
                style={styles.flatList}
                numColumns={4}
                data={data}
                renderItem={renderItem}
            />


            <TouchableOpacity style={styles.restartViewContainer} onPress={resetData}>
                <View>
                    <Text style={styles.restartTextContainer}>RESTART</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: theme.colors.secondaryNavy,
        alignItems: 'center',
        justifyContent: 'center',
    },
    resultContainer: {
        flexDirection: 'row',
    },
    matchesViewContainer: {
        flex: 0.5,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: theme.colors.greyNavSelectedBorder,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: 100,
    },
    matchesTextContainer: {
        ...theme.fonts.h2JostBold,
        color: theme.colors.standardWhite,
        textAlign: 'center'
    },
    restartViewContainer: {
        width: '50%',
        height: 48,
        borderRadius: 8,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.alertOrange,
        borderColor: theme.colors.standardWhite,
        marginBottom: 10,
    },
    restartTextContainer: {
        ...theme.fonts.label1JostSemibold,
        color: theme.colors.standardWhite
    },
    flatList: {
        marginBottom: 10,
    },
    item: {
        width: 65,
        height: 100,
        borderWidth: 1.5,
        borderColor: theme.colors.standardWhite,
        backgroundColor: theme.colors.tertiaryFadeGreen,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 12,
        borderRadius: 8,
    },
    itemText: {
        ...theme.fonts.h1JostBold,
        color: theme.colors.standardBlack,
    },
})

export default winningDialog()(HomeScreen);