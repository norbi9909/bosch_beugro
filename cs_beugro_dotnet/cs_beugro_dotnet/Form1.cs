using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using MySql.Data.MySqlClient;

namespace cs_beugro_dotnet
{
    public partial class Form1 : Form
    {
        MySqlConnection conn = new MySqlConnection(
            "server = localhost; userid = root; password = ; database = cs_beugro "
            );

        public Form1()
        {
            InitializeComponent();
        }

        private void btnConnect_Click(object sender, EventArgs e)
        {
            try
            {
                using(DataTable dt = new DataTable("Products"))
                {
                    conn.Open();
                    using (MySqlCommand cmd = new MySqlCommand("select * from products", conn))
                    {
                        MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(cmd);
                        mySqlDataAdapter.Fill(dt);
                        dataGridView1.DataSource = dt;
                    }
                }
            }catch(Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
            finally
            {
                conn.Close();
            }

        }

        private void btnSelectRnd_Click(object sender, EventArgs e)
        {
            Random rnd = new Random();
            List<int> SelectionList = new List<int>();
            int numberOfItems;

            numberOfItems = dataGridView1.Rows.Count;

            try
            {
                using (DataTable dt = new DataTable("Products"))
                {
                    conn.Open();
                    using (MySqlCommand cmd = new MySqlCommand("select * from products where id = " + SelectionList + ";", conn))
                    {
                        for (int i = 0; i < 9; i++)
                        {
                            SelectionList.Add(rnd.Next(1, numberOfItems));
                        }
                        MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(cmd);
                        mySqlDataAdapter.Fill(dt);


                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
            finally
            {
                conn.Close();
            }
        }

        public void RowsAdded(object sender, DataGridViewRowsAddedEventArgs e)
        {
        }
    }
}
