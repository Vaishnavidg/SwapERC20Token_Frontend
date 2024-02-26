import { SwapVertTwoTone } from '@mui/icons-material'
import { Autocomplete, Avatar, Box, Button, Card, Input, Paper, TextField, Typography } from '@mui/material'
import { pink } from '@mui/material/colors'
import React from 'react';

interface SwapComponentProps {
    contract: any;
}

export default function SwapComponent({ contract }: SwapComponentProps) {
    const options = ['Germany_Token', 'Indian_Token'];
    const value=1;
    console.log(contract);
    console.log(contract.functions.tokenG);
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Card sx={{ width: '450px', height: '125px', bgcolor: '#83d2e8', marginBottom: '5px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: '1.5rem' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant='body2'>You Pay</Typography>
                        <Input aria-label='Swap Amount' type='number' sx={{width:50}}/>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                       
                        <Autocomplete                      
                            id="controllable-states-demo"
                            options={options}
                            sx={{ width: 150 }}
                            renderInput={(params) => <TextField {...params} label="Select Tokens" />}
                        />
                    </Box>
                </Box>
            </Card>
            <Button>
                <SwapVertTwoTone sx={{ width: '150px', marginBottom: '0px' }} />
            </Button>
            <Card sx={{ width: '450px', height: '125px', bgcolor: '#83d2e8', marginTop: '5px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: '1.5rem' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant='body2'>You Pay</Typography>
                        <Input aria-label='Swap Amount' type='number' sx={{width:50}} value={value}/>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                       
                        <Autocomplete                      
                            id="controllable-states-demo"
                            options={options}
                            sx={{ width: 150 }}
                            renderInput={(params) => <TextField {...params} label="Select Tokens" />}
                        />
                    </Box>
                </Box>
            </Card>
            <Button sx={{marginTop: '1rem', width: 250,height:50}} variant='contained'>Swap</Button>
        </Box>
    )
}
