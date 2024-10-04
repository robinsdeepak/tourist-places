import 'package:flutter/material.dart';
import '../models/place.dart';
import '../services/api_service.dart';

class PlaceViewer extends StatefulWidget {
  @override
  _PlaceViewerState createState() => _PlaceViewerState();
}

class _PlaceViewerState extends State<PlaceViewer> {
  final ApiService apiService = ApiService();
  Place? place;
  int currentPlaceId = 1;
  final int maxPlaceId = 10;
  bool isLoading = false;

  @override
  void initState() {
    super.initState();
    fetchPlace(currentPlaceId);
  }

  Future<void> fetchPlace(int id) async {
    setState(() {
      isLoading = true;
    });
    try {
      Place fetchedPlace = await apiService.fetchPlace(id);
      setState(() {
        place = fetchedPlace;
      });
    } catch (e) {
      print('Error fetching place: $e');
      throw Exception(e);
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  void handleNext() {
    if (currentPlaceId < maxPlaceId) {
      currentPlaceId++;
      fetchPlace(currentPlaceId);
    }
  }

  void handleBack() {
    if (currentPlaceId > 1) {
      currentPlaceId--;
      fetchPlace(currentPlaceId);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: null, // Remove the AppBar for a consistent UI
      body: isLoading
          ? const Center(child: CircularProgressIndicator())
          : place != null
              ? SingleChildScrollView(
                  child: Column(
                    children: [
                      const SizedBox(height: 50),
                      Text(
                        place!.name,
                        style: const TextStyle(
                          fontSize: 28,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 20),
                      Image.network(
                        place!.image,
                        height: 300,
                        fit: BoxFit.cover,
                      ),
                      const SizedBox(height: 20),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 16.0),
                        child: Column(
                          children: [
                            Text(
                              'Best Time to Visit: ${place!.bestTimeToVisit}',
                              style: const TextStyle(fontSize: 18),
                            ),
                            const SizedBox(height: 10),
                            Text(
                              'Best Things to Do: ${place!.bestThingsToDo}',
                              style: const TextStyle(fontSize: 18),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 30),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          if (currentPlaceId > 1)
                            ElevatedButton(
                              onPressed: handleBack,
                              style: ElevatedButton.styleFrom(
                                foregroundColor: Colors.blue,
                              ),
                              child: const Text('Back'),
                            ),
                          const SizedBox(width: 20),
                          if (currentPlaceId < maxPlaceId)
                            ElevatedButton(
                              onPressed: handleNext,
                              style: ElevatedButton.styleFrom(
                                foregroundColor: Colors.blue,
                              ),
                              child: const Text('Next'),
                            ),
                        ],
                      ),
                      const SizedBox(height: 50),
                    ],
                  ),
                )
              : const Center(
                  child: Text('No place data available.'),
                ),
    );
  }
}
