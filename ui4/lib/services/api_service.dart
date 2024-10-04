import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/place.dart';

class ApiService {
  static const String baseUrl = 'http://localhost:3001';

  Future<Place> fetchPlace(int id) async {
    final response = await http.get(Uri.parse('$baseUrl/places/$id'));
    const int delay = 1;
    await Future.delayed(const Duration(seconds: delay));

    if (response.statusCode == 200) {
      return Place.fromJson(json.decode(response.body));
    } else {
      throw Exception('Failed to load place');
    }
  }
}
