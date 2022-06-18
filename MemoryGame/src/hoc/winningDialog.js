import React, { useState, Fragment } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Overlay } from 'react-native-elements';
import { theme } from '../utils/theme';
import { maxNumberOfCards } from '../utils/constants';

const winningDialog = () => (WrappedComponent) => (props) => {
    const [dialogProps, setdialogProps] = useState({
        visibility: false,
        turns: '',
    });

    // Displaying dialog
    const showWinningDialog = (turns) => {
        setdialogProps({
            ...dialogProps,
            turns: turns,
            visibility: true,
        });
    };

    // function for dialog button press
    const dialogButtonPress = () => {
        setdialogProps({
            ...dialogProps,
            turns: '',
            visibility: false,
        });
    };

    // update current props
    const propsWithWinningDialog = {
        ...props,
        showWinningDialog: showWinningDialog,
    };

    return (
        <Fragment>
            <WrappedComponent {...propsWithWinningDialog} />
            <Overlay
                isVisible={dialogProps.visibility}
                fullScreen
                overlayStyle={styles.container}>
                <View style={styles.container2}>
                    <Text style={[styles.errorText, styles.textFont]}>Congratulations</Text>
                    <Text style={[styles.errorTextSub, theme.fonts.label1JostSemibold]}>
                        {
                            dialogProps.turns === maxNumberOfCards ?
                                'You have done a great job, Your the one guy to complete the game in minimum number of steps' :
                                `Great job, you have completed this game by ${dialogProps.turns} Number of turns.`
                        }
                    </Text>
                    <TouchableOpacity style={styles.buttonContainer} onPress={dialogButtonPress}>
                        <View style={styles.textContainer}>
                            {
                                dialogProps.turns === maxNumberOfCards ? (
                                    <Text style={styles.text}>Good Job</Text>
                                ) : (
                                    <Text style={styles.text}>Try Again</Text>
                                )
                            }
                        </View>
                    </TouchableOpacity>
                </View>
            </Overlay>
        </Fragment>
    );
};

const styles = StyleSheet.create({
    textFont: {
        ...theme.fonts.h2JostBold
    },
    errorText: {
        color: theme.colors.standardBlack,
        textAlign: 'center',
    },
    errorTextSub: {
        color: theme.colors.lightGrey1,
        textAlign: 'center',
        marginTop: 10,
    },
    buttonContainer: {
        borderRadius: 10,
        marginTop: 10,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container2: {
        backgroundColor: theme.colors.standardWhite,
        borderRadius: 10,
        padding: 15,
        width: '80%'
    },
    textContainer: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: theme.colors.standardBlue,
    },
    text: {
        color: theme.colors.standardWhite,
        ...theme.fonts.label1JostSemibold
    }
});

export default winningDialog;
