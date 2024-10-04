import 'package:flutter/material.dart';
import 'screens/place_viewer.dart';

void main() {
  runApp(const TouristPlacesApp());
}

class TouristPlacesApp extends StatelessWidget {
  const TouristPlacesApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Tourist Places',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: PlaceViewer(),
    );
  }
}
