import java.sql.*;

public class BudgetApp {
  public static void main(String[] args) {
    try (Connection conn = DriverManager.getConnection("jdbc:sqlite:budget.db")) {
      // Create table if it doesn't exist
      Statement stmt = conn.createStatement();
      stmt.executeUpdate("CREATE TABLE IF NOT EXISTS expenses (id INTEGER PRIMARY KEY AUTOINCREMENT, category TEXT, amount REAL)");

      // Add expense
      Scanner scanner = new Scanner(System.in);
      System.out.print("Enter category: ");
      String category = scanner.nextLine();
      System.out.print("Enter amount: ");
      double amount = scanner.nextDouble();

      // Insert expense into database
      PreparedStatement insertStmt = conn.prepareStatement("INSERT INTO expenses (category, amount) VALUES (?, ?)");
      insertStmt.setString(1, category);
      insertStmt.setDouble(2, amount);
      insertStmt.executeUpdate();

      // Retrieve and display expenses
      ResultSet rs = stmt.executeQuery("SELECT * FROM expenses");
      while (rs.next()) {
        System.out.println("ID: " + rs.getInt("id") + ", Category: " + rs.getString("category") + ", Amount: " + rs.getDouble("amount"));
      }
    } catch (SQLException e) {
      System.err.println("Error: " + e.getMessage());
    }
  }
}