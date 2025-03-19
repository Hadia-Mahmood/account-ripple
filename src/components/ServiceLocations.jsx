
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usStates, getCitiesByState } from '@/data/usLocations';
import { Badge } from '@/components/ui/badge';
import { MapPin, Plus, X } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

const ServiceLocations = ({ state, serviceCities, isEditing, onSave }) => {
  const [selectedState, setSelectedState] = useState(state || '');
  const [selectedCities, setSelectedCities] = useState(serviceCities || []);
  const [availableCities, setAvailableCities] = useState([]);
  const [cityDialogOpen, setCityDialogOpen] = useState(false);
  
  useEffect(() => {
    if (selectedState) {
      setAvailableCities(getCitiesByState(selectedState));
    } else {
      setAvailableCities([]);
    }
  }, [selectedState]);
  
  const handleStateChange = (newState) => {
    setSelectedState(newState);
    setSelectedCities([]);
  };
  
  const handleAddCities = () => {
    setCityDialogOpen(true);
  };
  
  const handleRemoveCity = (city) => {
    setSelectedCities(selectedCities.filter(c => c !== city));
  };
  
  const handleCityToggle = (city, checked) => {
    if (checked) {
      setSelectedCities(prev => [...prev, city]);
    } else {
      setSelectedCities(prev => prev.filter(c => c !== city));
    }
  };
  
  const handleSaveCities = () => {
    setCityDialogOpen(false);
    
    if (isEditing) {
      onSave({
        state: selectedState,
        serviceCities: selectedCities
      });
    }
  };
  
  return (
    <>
      <Card className="border-none shadow-md bg-white">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="mr-2 h-5 w-5 text-primary" />
            Service Locations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">State</label>
              {isEditing ? (
                <Select value={selectedState} onValueChange={handleStateChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {usStates.map(state => (
                      <SelectItem key={state.abbreviation} value={state.name}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="p-2 bg-gray-50 rounded">{state}</div>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Service Cities</label>
                {isEditing && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={handleAddCities}
                    disabled={!selectedState}
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add Cities
                  </Button>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2 min-h-[100px] p-2 bg-gray-50 rounded">
                {selectedCities.length > 0 ? (
                  selectedCities.map(city => (
                    <Badge key={city} className="flex items-center gap-1 bg-primary/10 text-primary border-none">
                      {city}
                      {isEditing && (
                        <X 
                          className="h-3 w-3 cursor-pointer opacity-70 hover:opacity-100" 
                          onClick={() => handleRemoveCity(city)}
                        />
                      )}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground p-2">
                    {isEditing 
                      ? 'Select a state and add service cities' 
                      : 'No service cities added yet'}
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={cityDialogOpen} onOpenChange={setCityDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Service Cities</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-3 py-4 max-h-[300px] overflow-y-auto">
            {availableCities.map(city => (
              <div key={city} className="flex items-center space-x-2">
                <Checkbox 
                  id={`city-${city}`} 
                  checked={selectedCities.includes(city)}
                  onCheckedChange={(checked) => handleCityToggle(city, checked)}
                />
                <Label htmlFor={`city-${city}`} className="text-sm">
                  {city}
                </Label>
              </div>
            ))}
            
            {availableCities.length === 0 && (
              <p className="text-muted-foreground col-span-2 text-center py-4">
                Please select a state first
              </p>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setCityDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveCities}>
              Save Cities
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ServiceLocations;
